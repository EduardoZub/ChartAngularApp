import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsComponent } from './components/news/news.component';

export const routes = [
    { path: '', component: DashboardComponent },
    { path: 'news', component: NewsComponent }
];
