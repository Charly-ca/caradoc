import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    if (this.element.classList.contains('is-initialized')) {
      return
    }

    this.initSplide()
    this.element.classList.add('is-initialized')
  }

  disconnect() {
    // CRITIQUE : Détruit proprement Splide quand on quitte la page
    if (this.splide) {
      this.splide.destroy()
      this.element.classList.remove('is-initialized')
    }
  }

  initSplide() {
    const carouselType = this.element.dataset.carouselType || 'slide'

    this.splide = new Splide(this.element, {
      type: 'loop',
      autoplay: true,
      interval: carouselType === 'fade' ? 5000 : 4000,
      speed: carouselType === 'fade' ? 1200 : 1000,
      arrows: false,
      pagination: true,
      perPage: 1,
      perMove: 1,
      clones: 2,
      resetProgress: false
    }).mount()

    // Force le démarrage de l'autoplay
    setTimeout(() => {
      if (this.splide && this.splide.Components.Autoplay) {
        this.splide.Components.Autoplay.play()
      }
    }, 100)
  }
}
