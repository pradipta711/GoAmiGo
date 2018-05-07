import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app-routing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule,Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './services/authentication.service';
// import { LoginComponent } from './login/login.component';
import { LoginComponent } from './login/login.component';
// import { SearchComponent } from './search/search.component';
import { PlanComponent } from './plan/plan.component';
import { UsertripService } from './services/usertrip.service';
import { LoneComponent } from './lone/lone.component';
import { MytripsComponent } from './mytrips/mytrips.component';
import { ModalComponent } from './services/modal.component';
import { GroupComponent } from './group/group.component';
import {PlanService} from './services/plan.service';
import {TabsModule} from "ngx-tabs";
import {TransactionService} from './services/transaction.service'
import { MapsAPILoader,AgmCoreModule } from '@agm/core';
//import { AgmCoreModule } from '@agm/core';
import { SuggestionsService } from './services/suggestions.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './services/navbar.service';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ChatComponent } from './chat/chat.component';
//import { NavbarService } from './navbar/navbar.service';
import {ChatService} from './services/chat.service';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FileService } from './services/file.service';
import { FileSelectDirective, FileUploader, FileUploadModule} from 'ng2-file-upload';
import { SuggestionComponent } from './suggestion/suggestion.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    // SearchComponent,
    PlanComponent,
    LoneComponent,
    MytripsComponent,
    ModalComponent,
    GroupComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    ChatComponent,
    ImageGalleryComponent,
    FileuploadComponent,
    SuggestionComponent
    
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    HttpModule,
    TabsModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyDgQfG6Y-bbidUjlgoNX8SotR2ofd2H9kA',libraries:["places"]}),
  ],
  providers: [
    AuthenticationService,
    UsertripService,
    PlanService,
    UUID,
    TransactionService,
    SuggestionsService,
    NavbarService,
    ChatService,
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
