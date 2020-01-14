import { AuthService } from './../../services/auth.service';
import { ModalsComponent } from './../modals/modal';
import { regexpEmail, regexpPasswordNickname, regexpFirstLastnameCityCountr, regexpPhone, regexpGenderOrient, regexpDateOfBirth } from './../../helpers/regexp';

export class SignupComponent {
	constructor() {
		this._authService = new AuthService();
        this._modal = new ModalsComponent();
	}

	render() {
        return `
        <div class="auth-wrap d-flex mt-5">
            <div class="auth-form col col-6 mx-auto my-auto">
                <h3>SignUp to Social.</h3>
                <p class="text-secondary">Enter your details for registration.</p>
                <form name="signupForm" novalidate>
                    <div class="form-group">
                        <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$" title="Enter your email, in the format name@example.com">
                        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+" title="Enter your password, at least 8 characters">
                        <input type="text" class="form-control form-control-sm mt-3" id="nickname" placeholder="nickname" required data-pattern="\S+" title="Enter your nickname, at least 8 characters">
                        <input type="text" class="form-control form-control-sm mt-3" id="first_name" placeholder="first_name" required data-pattern="\S+[A-Za-z]" title="Enter your name">
                        <input type="text" class="form-control form-control-sm mt-3" id="last_name" placeholder="last_name" required data-pattern="\S+[A-Za-z]" title="Enter your last name">
                        <input type="tel" class="form-control form-control-sm mt-3" id="phone" placeholder="phone" required data-pattern="^\(\d{3}\)\d{3}-\d{2}-\d{2}$" title="Enter your phone number in the format (XXX)XXX-XX-XX">
                        <input type="text" class="form-control form-control-sm mt-3" id="gender_orientation" placeholder="gender_orientation" required data-pattern="[female, male]" title="Enter your gender (female / male)">
                        <input type="text" class="form-control form-control-sm mt-3" id="city" placeholder="city" required data-pattern="\S+[A-Za-z]" title="Enter the name of the city where you live">
                        <input type="text" class="form-control form-control-sm mt-3" id="country" placeholder="country" required data-pattern="\S+[A-Za-z]" title="Enter the name of the country where you live">
                        <input type="text" class="form-control form-control-sm mt-3" id="date_of_birth" placeholder="date_of_birth" required data-pattern="^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$" title="Enter your date of birth in the format dd.mm.yyyy">
                        <div class="d-flex mt-5">
                            <button type="submit" class="btn btn-primary btn-sm">SignUp</button>
                        </div>
                        <a href="#/">Go to Home page</a>
                    </div>
                </form>
            </div>
            <!-- /.auth-form -->
            <div class="auth-bg col col-6">

            </div>
            <!-- /.auth-bg -->
        </div>
        <!-- /.auth-wrap -->
        `;
	}

	afterRender() {
		document.forms.signupForm.addEventListener('submit', e => {
			e.preventDefault();

            const { email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth } = e.target.elements;

            if(!regexpEmail.test(email.value)) {
                return console.warn('Укажите верный email');
            }

             if(!regexpPasswordNickname.test(password.value)) {
                return console.warn('Укажите верный password');
            }

              if(!regexpPasswordNickname.test(nickname.value)) {
                return console.warn('Укажите верный nickname');
            }

              if(!regexpFirstLastnameCityCountr.test(first_name.value)) {
                return console.warn('Укажите верный first_name');
            }

              if(!regexpFirstLastnameCityCountr.test(last_name.value)) {
                return console.warn('Укажите верный last_name');
            }

              if(!regexpPhone.test(phone.value)) {
                return console.warn('Укажите верный phone');
            }

              if(!regexpGenderOrient.test(gender_orientation.value)) {
                return console.warn('Укажите верный gender_orientation');
            }

              if(!regexpFirstLastnameCityCountr.test(city.value)) {
                return console.warn('Укажите верный city');
            }            

              if(!regexpFirstLastnameCityCountr.test(country.value)) {
                return console.warn('Укажите верный country');
            } 

              if(!regexpDateOfBirth.test(date_of_birth.value)) {
                return console.warn('Укажите верный date_of_birth');
            } 

            if (!email.value || !password.value || !nickname.value || !first_name.value || !last_name.value || !phone.value || !gender_orientation.value || !city.value || !country.value || !date_of_birth.value) {
                return console.warn('Заполните все поля');
            }

            const [day, month, year] = date_of_birth.value.split('.');

            const data = {
               email: email.value,
               password: password.value,
               nickname: nickname.value,
               first_name: first_name.value,
               last_name: last_name.value,
               phone: phone.value,
               gender_orientation: gender_orientation.value,
               city: city.value,
               country: country.value,
               date_of_birth_day: day,
               date_of_birth_month: month,
               date_of_birth_year: year,
            };

            this._authService.signup(data)
            .then(response => console.log(response))
            .catch(err => this._modal.render(err.message));
		});
	}
}