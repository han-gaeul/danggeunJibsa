# Generated by Django 3.2.13 on 2022-12-02 02:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0002_auto_20221202_1027'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dailyjournal',
            name='date',
        ),
        migrations.RemoveField(
            model_name='dogwalkingjournal',
            name='date',
        ),
        migrations.RemoveField(
            model_name='healthjournal',
            name='date',
        ),
    ]