from django import forms
from .models import Usuario

class Usuario_form(forms.ModelForm):

    class Meta:
        model = Usuario
        fields = ['email', 'password']
        widgets = {
            'password': forms.PasswordInput()
        }
        labels = {
            'email': 'Correo',
            'password': 'Contraseña'
        }

class Mod_perfil_form(forms.ModelForm):

    class Meta:
        model = Usuario
        fields = ['nombre','apellido','edad','tel','email','ciudad','direccion_calle','direccion_numero', 'suscripcion']
        widgets = {
            'nombre':forms.TextInput(attrs={"class":"form-control"}),
            'apellido':forms.TextInput(attrs={"class":"form-control"}),
            'edad':forms.NumberInput(attrs={"class":"form-control"}),
            'tel':forms.NumberInput(attrs={"class":"form-control"}),
            'email':forms.EmailInput(attrs={"class":"form-control"}),
            'ciudad':forms.Select(attrs={"class":"form-control"}),
            'direccion_calle':forms.TextInput(attrs={"class":"form-control"}),
            'direccion_numero':forms.NumberInput(attrs={"class":"form-control"}),
            'suscripcion':forms.CheckboxInput(attrs={"class":"form-check-input"}),
        }
        labels = {
            'nombre':'Nombre',
            'apellido':'Apellido',
            'edad':'Edad',
            'tel':'Telefono',
            'email':'Correo',
            'ciudad':'Ciudad',
            'direccion_calle':'Calle',
            'direccion_numero':'Numeracion',
            'suscripcion': 'Suscripción',
        }

class Perfil_form(forms.ModelForm):

    class Meta:
        model = Usuario
        fields = ['nombre','apellido','edad','tel','email','ciudad','direccion_calle','direccion_numero', 'suscripcion']
        widgets = {
            'nombre':forms.TextInput(attrs={"class":"form-control","disabled":"true"}),
            'apellido':forms.TextInput(attrs={"class":"form-control","disabled":"true"}),
            'edad':forms.NumberInput(attrs={"class":"form-control","disabled":"true"}),
            'tel':forms.NumberInput(attrs={"class":"form-control","disabled":"true"}),
            'email':forms.EmailInput(attrs={"class":"form-control","disabled":"true"}),
            'ciudad':forms.Select(attrs={"class":"form-control","disabled":"true"}),
            'direccion_calle':forms.TextInput(attrs={"class":"form-control","disabled":"true"}),
            'direccion_numero':forms.NumberInput(attrs={"class":"form-control","disabled":"true"}),
            'suscripcion':forms.CheckboxInput(attrs={"class":"form-check-input","disabled":"true"}),
        }
        labels = {
            'nombre':'Nombre',
            'apellido':'Apellido',
            'edad':'Edad',
            'tel':'Telefono',
            'email':'Correo',
            'ciudad':'Ciudad',
            'direccion_calle':'Calle',
            'direccion_numero':'Numeracion',
            'suscripcion':'Suscripción',
        }