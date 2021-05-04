import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router:Router) { 

    let usuarioActivo = localStorage.getItem('usuarioActivo');
      if(!(usuarioActivo == null  ||  usuarioActivo==undefined)){
        this.router.navigate(['/dashboard']);
        return;
      }
  }

  ngOnInit(): void {
  }

}
