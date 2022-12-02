# Generated by Django 3.2.13 on 2022-12-02 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('care', '0002_auto_20221202_1701'),
    ]

    operations = [
        migrations.AddField(
            model_name='care',
            name='caring_time',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='care',
            name='etc',
            field=models.CharField(default=1, max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='care',
            name='caring_animal',
            field=models.CharField(default='', max_length=20),
        ),
    ]
