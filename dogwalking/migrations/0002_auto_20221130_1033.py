# Generated by Django 3.2.13 on 2022-11-30 01:33

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_liking'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dogwalking', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dogwalking',
            name='like_user',
            field=models.ManyToManyField(blank=True, related_name='like_dogwalking', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='dogwalking',
            name='pet',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pet', to='accounts.pet'),
        ),
        migrations.AddField(
            model_name='review',
            name='grade',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
            preserve_default=False,
        ),
    ]
