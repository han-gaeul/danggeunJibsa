from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import imagekit.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Journal',
            
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('journal_board', models.CharField(choices=[('일기', '일기'), ('산책일기', '산책일기'), ('건강일기', '건강일기')], default='선택', max_length=20)),
                ('route', models.TextField(null=True)),
                ('consumed_calories', models.IntegerField(null=True)),
                ('walking_time', models.IntegerField(null=True)),
                ('content', models.TextField(null=True)),
                ('image', imagekit.models.fields.ProcessedImageField(blank=True, upload_to='images/daily_journal/')),
                ('meals', models.CharField(max_length=100, null=True)),
                ('energy', models.CharField(max_length=100, null=True)),
                ('medicine', models.CharField(max_length=100, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('pet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.pet')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
