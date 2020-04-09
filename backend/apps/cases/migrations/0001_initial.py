# Generated by Django 3.0.4 on 2020-04-08 23:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('organisation', '0002_auto_20200408_2314'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Case',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('diagnosis', models.TextField()),
                ('justification', models.TextField()),
                ('recommendation', models.TextField()),
                ('category', models.CharField(max_length=100)),
                ('consent', models.BooleanField(default=False)),
                ('age', models.IntegerField(null=True)),
                ('sex', models.BooleanField(choices=[(0, 'Female'), (1, 'Male')], default=0)),
                ('country', models.CharField(max_length=100)),
                ('comments', models.TextField(blank=True)),
                ('outcome', models.CharField(blank=True, max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(blank=True, max_length=50)),
                ('assigned_partners', models.ManyToManyField(blank=True, related_name='assigned_cases', to='organisation.Organisation')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cases_created', to=settings.AUTH_USER_MODEL)),
                ('matched_partners', models.ManyToManyField(blank=True, related_name='matched_cases', to='organisation.Organisation')),
            ],
        ),
    ]
