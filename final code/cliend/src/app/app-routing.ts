import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PlanComponent } from './plan/plan.component';
import { LoneComponent} from './lone/lone.component';
import { MytripsComponent} from './mytrips/mytrips.component'
import  {GroupComponent} from './group/group.component'
import  {HomeComponent} from './home/home.component'
import { SearchComponent } from './search/search.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

//import {} from './';
const appRoutes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'plantrip', component: PlanComponent},
    {path: 'lone', component:LoneComponent },
    {path: 'mytrips', component:MytripsComponent},
    {path:'group', component:GroupComponent},
    {path:'home', component:HomeComponent},
    {path:'search', component:SearchComponent},
    {path:'suggestion', component:SuggestionComponent},
    {path:'',redirectTo:'home',pathMatch:'full'}


];

export const routing = RouterModule.forRoot(appRoutes);

