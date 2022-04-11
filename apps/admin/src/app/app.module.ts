/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from'@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardComponent} from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriesService, ProductsService } from '@shopsite/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {UsersFormComponent } from './pages/users/users-form/users-form.component';
import {UsersListComponent } from './pages/users/users-list/users-list.component';
import { TagModule } from 'primeng/tag';
import { JwtInterceptor, UsersModule, UsersService } from '@shopsite/users';
import {AccordionModule} from 'primeng/accordion';
import {InputMaskModule} from 'primeng/inputmask';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import {FieldsetModule} from 'primeng/fieldset';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';

const UX_MODULE = [
    CardModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    InputMaskModule,
    TableModule,
    AccordionModule,
    ToastModule,
    TagModule,
    FieldsetModule,
    ColorPickerModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule
]

@NgModule({
    declarations: [AppComponent,DashboardComponent,ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent,OrdersListComponent,OrdersDetailComponent,UsersFormComponent,UsersListComponent],
    imports: [BrowserModule,StoreModule.forRoot({}),EffectsModule.forRoot([]),HttpClientModule,BrowserAnimationsModule,FormsModule,UsersModule, ReactiveFormsModule,
        UX_MODULE,AppRoutingModule,NgxStripeModule.forRoot('pk_test_51KmLgjSHITltCpxE3VAbTEVmmcCjoZBW0HxbcEyr2bJ7zR82aLChzXgPUBoXOGPnH8D56Wi6g2lVyZEWUqjWoNnj00fSz7YgvW')],
    providers: [CategoriesService,ConfirmationService,ProductsService,UsersService,MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {}
