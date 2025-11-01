// app/javascript/controllers/menu_tabs_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab", "content"]

  connect() {
    // Au chargement, afficher "plats" par défaut
    this.showTab("plats")
  }

  switchTab(event) {
    // Récupérer l'ID de l'onglet cliqué
    const tabId = event.currentTarget.dataset.tabId
    this.showTab(tabId)
  }

  showTab(tabId) {
    // Gérer l'état visuel des boutons
    this.tabTargets.forEach(tab => {
      if (tab.dataset.tabId === tabId) {
        // Bouton actif : fond marron
        tab.classList.remove("bg-white", "bg-transparent", "text-amber-900")
        tab.classList.add("bg-amber-900", "text-white")
      } else {
        // Bouton inactif : fond transparent (laisse voir le beige du parent)
        tab.classList.remove("bg-amber-900", "bg-white", "text-white")
        tab.classList.add("bg-transparent", "text-amber-900")
      }
    })

    // Gérer l'affichage du contenu
    this.contentTargets.forEach(content => {
      if (content.dataset.contentId === tabId) {
        content.classList.remove("hidden")
      } else {
        content.classList.add("hidden")
      }
    })
  }
}
