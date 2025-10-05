import { Controller } from "@hotwired/stimulus"


export default class extends Controller {
  connect() {
    // Vérifie qu'on n'a pas déjà initialisé ce carrousel
    if (this.element.classList.contains('is-initialized')) {
      return
    }

    // Récupère le type de carrousel depuis un attribut data
    const carouselType = this.element.dataset.carouselType || 'slide'

    const splide = new Splide(this.element, {
      type: carouselType,
      arrows: false,
      autoplay: true,
      interval: carouselType === 'fade' ? 5000 : 4000,
      speed: carouselType === 'fade' ? 1200 : 1000,
      pagination: true
    }).mount()

    // Force le démarrage de l'autoplay
    setTimeout(() => {
      splide.Components.Autoplay.play()
    }, 100)

    this.element.classList.add('is-initialized')
  }

  disconnect() {
    // Nettoie le carrousel quand l'élément est retiré du DOM
    // Splide gère son propre nettoyage automatiquement
  }
}
