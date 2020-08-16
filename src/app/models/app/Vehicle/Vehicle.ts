import { GALLERY_IMAGE } from 'ngx-image-gallery';

export interface Vehicle {
  id?: number;
  dateAdded?: string;
  make?: string;
  mileage?: number;
  color?: string;
  condition?: string;
  model?: string;
  year?: number;
  fuel?: string;
  transmission?: string;
  price?: number;
  description?: string;
  imageUrl?: string[];
  agentLocation?: string;
  agentName?: string;
  agentPhoneNumber?: string;
  pageNumber?: string;
  relatedVehicles?: any[];
}
