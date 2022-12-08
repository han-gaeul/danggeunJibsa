# Generated by Django 3.2.13 on 2022-12-08 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='review_board',
            field=models.CharField(blank=True, choices=[('용품 후기', '용품 후기'), ('박람회 후기', '박람회 후기'), ('병원 후기', '병원 후기')], default='선택', max_length=20),
        ),
    ]
