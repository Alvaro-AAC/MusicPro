# Generated by Django 4.0.4 on 2023-06-25 22:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Mascota',
        ),
        migrations.DeleteModel(
            name='Tipo_mascota',
        ),
    ]
