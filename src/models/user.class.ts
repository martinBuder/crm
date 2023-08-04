export class User {
	name!: string;
	firstname!: string;
	street!: string;
	housenumber!: number;
	postcode!: number;
	city!: string;
	phone!: number;
	email!: string;
	birthsday!: any;
	[key: string]: any; 

	constructor(obj?: any) {
		this.name = obj ? obj.name: '';
		this.firstname = obj ? obj.firstname: '';
		this.street = obj ? obj.street: '';
		this.housenumber = obj ? obj.housenumber: '';
		this.postcode = obj ? obj.postcode: '';
		this.city = obj ? obj.city: '';
		this.phone = obj ? obj.phone: '';
		this.email = obj ? obj.email: '';
		this.birthsday = obj ? obj.birthsday: '';
	}

	public toJSON() {
		return{
			name: this.name,
			firstname: this.firstname,
			street: this.street,
			housenumber: this.housenumber,
			postcode: this.postcode,
			city: this.city,
			phone: this.phone,
			email: this.email,
			birthsday: this.birthsday
		}
	}
}