// import { Component } from '@angular/core';
// import { HeaderComponent } from "../header/header.component";
// import { FooterComponent } from "../footer/footer.component";
// import { RouterLink, Router } from '@angular/router'
// import { ApiService } from '../../api.service';
// import { OnInit } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [HeaderComponent, FooterComponent, RouterLink],
//   providers:[],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent implements OnInit {

//   constructor(private api: ApiService, private router: Router) { }

//   async ngOnInit(): Promise<void> {
//       this.api.checkAuth().subscribe(
//         (success) => {
//           this.api.checkInstitution().subscribe(
//             (success) => {
//               this.router.navigate(['/startinstituicao']);
//             }, (error) => {
//               this.router.navigate(['/startdoador']);
//           })
//       })
//   }
// }
