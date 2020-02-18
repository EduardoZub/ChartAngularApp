import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { routes } from './routes';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular-highcharts';
import { MatIconModule } from '@angular/material/icon';
import { NewsComponent } from './components/news/news.component';
import { ChartComponent } from './components/chart/chart.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectorComponent } from './components/selector/selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderTopComponent } from './components/header-top/header-top.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { SelectorThemeWhiteDirective } from './derectives/selector-theme/selector-theme-white.directive';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ChartComponent,
    HeaderComponent,
    SelectorComponent,
    PreloaderComponent,
    HeaderTopComponent,
    DashboardComponent,
    ColorPickerComponent,
    SelectorThemeWhiteDirective
  ],
  imports: [
    ChartModule,
    BrowserModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
