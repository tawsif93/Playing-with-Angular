import { loenceAnimation, } from './../../animations/animation';
import { Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2, ViewChild, Input,  ViewEncapsulation, } from '@angular/core';
import { style, animate, AnimationBuilder, AnimationPlayer, } from '@angular/animations';
import { Subscription, } from 'rxjs/Subscription';
import { FilterPanelService, } from './filter-panel.service';
import { IFilterConfiguration, FilterControlTypes, } from './model/filter.model';

@Component({
	selector   : 'app-filter-panel',
	templateUrl: './filter-panel.component.html',
	styleUrls  : ['./filter-panel.component.scss', ],
	animations : loenceAnimation,
})
export class FilterPanelComponent implements OnInit, OnDestroy {
	@ViewChild('openButton') openButton;
	@ViewChild('panel') panel;
	@ViewChild('overlay') overlay: ElementRef;

	public player: AnimationPlayer;

	filterTypes = FilterControlTypes;

	onSettingsChanged: Subscription;
	panelActionSubscription: Subscription;

	@HostBinding('class.bar-closed') barClosed: boolean;

	@Input() filterConfiguration: IFilterConfiguration;

	constructor(
		private animationBuilder: AnimationBuilder,
		private renderer: Renderer2,
		private panelService: FilterPanelService
	) {
		this.barClosed = true;

		this.panelActionSubscription = this.panelService.panelAction.subscribe( _ => {
			this.openBar();
		});

		// this.onSettingsChanged =
		// 	this.fuseConfig.onSettingsChanged
		// 		.subscribe(
		// 			(newSettings) => {
		// 				this.fuseSettings = newSettings;
		// 			}
		// 		);

		// Get the nav model and add customize nav item
		// that opens the bar programmatically
		// const navModel = this.navigationService.getNavigationModel();

		// navModel.push({
		// 	'id'      : 'custom-function',
		// 	'title'   : 'Custom Function',
		// 	'type'    : 'group',
		// 	'children': [
		// 		{
		// 			'id'      : 'customize',
		// 			'title'   : 'Customize',
		// 			'type'    : 'item',
		// 			'icon'    : 'settings',
		// 			'function': () => {
		// 				this.openBar();
		// 			}
		// 		}
		// 	]
		// });
	}

	ngOnInit() {
		this.renderer.listen(this.overlay.nativeElement, 'click', () => {
			this.closeBar();
		});
	}

	onSettingsChange() {
		// this.fuseConfig.setSettings(this.fuseSettings);
	}

	closeBar() {
		this.player =
			this.animationBuilder
				.build([
					style({transform: 'translate3d(0,0,0)', }),
					animate('400ms ease', style({transform: 'translate3d(100%,0,0)', })),
				]).create(this.panel.nativeElement);

		this.player.play();

		this.player.onDone(() => {
			this.barClosed = true;
		});
	}

	openBar() {
		this.barClosed = false;

		this.player =
			this.animationBuilder
				.build([
					style({transform: 'translate3d(100%,0,0)', }),
					animate('400ms ease', style({transform: 'translate3d(0,0,0)', } )),
				]).create(this.panel.nativeElement);

		this.player.play();
	}

	ngOnDestroy() {
		this.onSettingsChanged.unsubscribe();
		this.panelActionSubscription.unsubscribe();
	}
}
