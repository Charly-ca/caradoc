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
    // Vérifie si on est sur la homepage en cherchant la classe sur le body
    const isHomepage = document.body.classList.contains('homepage')
    const scrollPosition = window.scrollY

    // Sur la homepage : comportement transparent qui devient opaque au scroll
    if (isHomepage) {
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
    } else {
      // Sur toutes les autres pages : navbar toujours opaque avec fond amber
      this.navTarget.classList.add('bg-amber-50', 'shadow-md')
      this.navTarget.classList.remove('bg-transparent')

      this.linkTargets.forEach(link => {
        link.classList.add('text-amber-900')
        link.classList.remove('text-white')
      })
    }
  }
}
