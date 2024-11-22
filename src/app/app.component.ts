import { Component, /*OnInit */} from '@angular/core';
import { RouterOutlet } from '@angular/router';
/*import { ApiService } from './api.service';
import { User } from './user.interface';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';*/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  

})
export class AppComponent /*implements OnInit*/ {
  imgpath: string = 'https://i.pinimg.com/236x/2b/1b/73/2b1b735acb27d594d03d968d282fa14a.jpg';  // Caminho da imagem
  title = 'firt_test';
  /*users: User[] = [];
  form = {

  }
  error: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUsers().subscribe(
      (users: User[]) => this.users = users,
      (error: any) => this.error = error
    )
    console.log('AppComponent initialized');;
  }

  submitData(data: NgForm) {
    console.log('Data:', data);

    if (!data || !data.value) {
        console.error('O formulário é inválido ou vazio:', data);
        return;
    }

    if (data.value.password !== data.value.confirm) {
        console.log('Senhas digitadas diferentes!');
    } else {
        console.log('Dados válidos. Enviando para API:', data.value);
        this.api.createUser(data.value); // Aqui, data contém `value`.
    }
}*/
}
