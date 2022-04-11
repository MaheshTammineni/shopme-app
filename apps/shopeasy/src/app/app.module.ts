
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {UiModule } from '@shopsite/ui';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
// import { HeaderComponent } from './shared/header/header.component';
// import { FooterComponent } from './shared/footer/footer.component';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@shopsite/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@shopsite/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { JwtInterceptor, UsersModule } from '@shopsite/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';

const routes: Routes = [
  { path:'', component: HomePageComponent},
]
@NgModule({
  declarations: [AppComponent, HomePageComponent,HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [BrowserModule,StoreModule.forRoot({}),EffectsModule.forRoot([]),UsersModule,NgxStripeModule.forRoot('pk_test_51KmLgjSHITltCpxE3VAbTEVmmcCjoZBW0HxbcEyr2bJ7zR82aLChzXgPUBoXOGPnH8D56Wi6g2lVyZEWUqjWoNnj00fSz7YgvW'),
  ToastModule,OrdersModule,HttpClientModule,UiModule,ProductsModule,RouterModule.forRoot(routes),AccordionModule,BrowserAnimationsModule],
  providers: [MessageService,
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}

