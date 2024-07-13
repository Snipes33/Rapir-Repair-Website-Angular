import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
})
export class ClientDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  ads: any = [];
  allAds: any = [];  // To store all ads initially
  validateForm!: FormGroup;

  constructor(private clientService: ClientService, private fb: FormBuilder) {
  }

  getAllAds() {
    this.clientService.getAllAds().subscribe(res => {
      this.ads = res;
      this.allAds = res;  // Store all ads initially
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      service: [null]
    });

    this.getAllAds();

    // Listen to changes in the search input and filter ads accordingly
    this.validateForm.get('service').valueChanges.pipe(
      debounceTime(300)  // Add debounce to reduce the number of requests
    ).subscribe(serviceName => {
      this.filterAds(serviceName);
    });
  }

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }

  filterAds(serviceName: string) {
    if (!serviceName) {
      this.ads = this.allAds;  // Show all ads if search bar is empty
    } else {
      this.ads = this.allAds.filter(ad => ad.serviceName.toLowerCase().includes(serviceName.toLowerCase()));
    }
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }
}
