import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WannabeSitterPageComponent } from './wannabe-sitter-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('WannabeSitterPageComponent', () => {
    let component: WannabeSitterPageComponent;
    let fixture: ComponentFixture<WannabeSitterPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WannabeSitterPageComponent],
            imports: [RouterTestingModule, HttpClientModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WannabeSitterPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
