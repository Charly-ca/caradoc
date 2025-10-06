import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "image", "counter"]

  connect() {
    // Liste des images depuis les data attributes du DOM
    console.log("✅ Gallery controller connecté !")
    this.images = Array.from(this.element.querySelectorAll('[data-action*="gallery#open"]')).map(el => {
      const img = el.querySelector('img')
      return {
        src: img.src,
        alt: img.alt
      }
    })
    this.currentIndex = 0

    // Navigation clavier
    this.boundHandleKeyboard = this.handleKeyboard.bind(this)
  }

  open(event) {
    const index = parseInt(event.params.index)
    this.currentIndex = index
    this.showImage()
    this.modalTarget.classList.remove('hidden')
    this.modalTarget.classList.add('flex')
    document.body.style.overflow = 'hidden' // Empêche le scroll

    // Active la navigation clavier
    document.addEventListener('keydown', this.boundHandleKeyboard)
  }

  close() {
    this.modalTarget.classList.add('hidden')
    this.modalTarget.classList.remove('flex')
    document.body.style.overflow = '' // Restore le scroll

    // Désactive la navigation clavier
    document.removeEventListener('keydown', this.boundHandleKeyboard)
  }

  closeOnBackdrop(event) {
    // Ferme uniquement si on clique sur le fond noir (pas sur l'image)
    if (event.target === this.modalTarget) {
      this.close()
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length
    this.showImage()
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
    this.showImage()
  }

  handleKeyboard(event) {
    if (event.key === 'Escape') {
      this.close()
    } else if (event.key === 'ArrowRight') {
      this.next()
    } else if (event.key === 'ArrowLeft') {
      this.previous()
    }
  }

  showImage() {
    const currentImage = this.images[this.currentIndex]
    this.imageTarget.src = currentImage.src
    this.imageTarget.alt = currentImage.alt
    this.counterTarget.textContent = `${this.currentIndex + 1} / ${this.images.length}`
  }

  disconnect() {
    // Nettoyage quand le controller est détruit
    document.removeEventListener('keydown', this.boundHandleKeyboard)
  }
}
