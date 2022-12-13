# Generated by Django 3.2.13 on 2022-12-12 23:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('journal', '0004_alter_dailyjournal_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='dailyjournal',
            name='pet',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.pet'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dogwalkingjournal',
            name='pet',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.pet'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='healthjournal',
            name='pet',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.pet'),
            preserve_default=False,
        ),
    ]
