# Generated by Django 3.2.13 on 2022-12-01 01:39

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_pet_pet_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='pet_image',
            field=imagekit.models.fields.ProcessedImageField(blank=True, upload_to='images/accounts_pet/'),
        ),
    ]