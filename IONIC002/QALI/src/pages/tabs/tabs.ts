import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { contactospage } from '../contactos/contactos';
import { perfilpage } from '../perfil/perfil';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = contactospage;
  tab3Root = perfilpage;

  constructor() {

  }
}
