import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private deferredPrompt: any;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: any) {
    // Evita o prompt automático
    event.preventDefault();
    this.deferredPrompt = event;
    // Exibe um botão ou algum elemento para o usuário interagir
    this.showInstallButton = true;
  }

  showInstallButton: boolean = false;

  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou o prompt de instalação');
        } else {
          console.log('Usuário rejeitou o prompt de instalação');
        }
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }
}
