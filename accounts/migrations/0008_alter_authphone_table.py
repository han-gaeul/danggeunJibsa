# Generated by Django 3.2.13 on 2022-12-07 13:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20221207_2213'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='authphone',
            table='sms_auth_requests',
        ),
    ]
