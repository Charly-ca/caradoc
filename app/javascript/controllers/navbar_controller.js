import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["nav", "link"]

  connect() {
    // Initialise l'état correct au chargement
    this.updateNavbar()
  }

  scroll() {
    this.updateNavbar()
  }

  updateNavbar() {
    const scrollPosition = window.scrollY

    if (scrollPosition > 100) {
      // Navbar opaque après 100px de scroll
      this.navTarget.classList.add('bg-amber-50', 'shadow-md')
      this.navTarget.classList.remove('bg-transparent')

      this.linkTargets.forEach(link => {
        link.classList.add('text-amber-900')
        link.classList.remove('text-white')
      })
    } else {
      // Navbar transparente en haut de page
      this.navTarget.classList.add('bg-transparent')
      this.navTarget.classList.remove('bg-amber-50', 'shadow-md')

      this.linkTargets.forEach(link => {
        link.classList.add('text-white')
        link.classList.remove('text-amber-900')
      })
    }
  }
}
