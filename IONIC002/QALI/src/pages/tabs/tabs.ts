import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { monederopage } from '../monedero/monedero';
import { perfilpage } from '../perfil/perfil';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = monederopage;
  tab3Root = perfilpage;

  constructor() {

  }
}
