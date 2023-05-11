import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Factura } from 'src/app/models/factura.model';
import { FacturaService } from 'src/app/services/factura.service';
import { loginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-factura-lista',
  templateUrl: './factura-lista.component.html',
  styleUrls: ['./factura-lista.component.scss'],
})
export class FacturaListaComponent implements OnInit {
  listaFactura: Factura[] = [];

  constructor(
    private facturaService: FacturaService,
    public loginService: loginService
  ) {}

  async ngOnInit() {
    console.log(new Date().toJSON().substring(0, 11) + '00:00:00.000Z');
    const { value } = await Preferences.get({ key: 'token' });
    if (value)
      this.loginService.QsoyYo(value).then((res) => {
        this.facturaService
          .getFacturaByDayByUser(res.data)
          .subscribe((data) => {
            this.listaFactura = data;
            console.log(data);
          });
      });
  }
}
