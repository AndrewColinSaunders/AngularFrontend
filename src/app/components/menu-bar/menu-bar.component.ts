import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-global-nav-bar',
    templateUrl: './menu-bar.component.html',
    standalone: true,
    imports: [MenubarModule, InputTextModule, AvatarModule, CommonModule]
})
export class GlobalNavBarComponent implements OnInit {
    @Output() searchTermChanged = new EventEmitter<string>();
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Home', icon: 'pi pi-home' },
            { label: 'Features', icon: 'pi pi-star' },
            {
                label: 'Projects',
                icon: 'pi pi-search',
                items: [
                    { label: 'Components', icon: 'pi pi-bolt' },
                    { label: 'Blocks', icon: 'pi pi-server' },
                    { label: 'UI Kit', icon: 'pi pi-pencil' },
                    { label: 'Templates', icon: 'pi pi-palette', items: [{ label: 'Apollo', icon: 'pi pi-palette' }, { label: 'Ultima', icon: 'pi pi-palette' }] }
                ]
            },
            { label: 'Contact', icon: 'pi pi-envelope' }
        ];
    }

    onSearchTermChange(event: any) {
        this.searchTermChanged.emit(event.target.value);
    }
}
