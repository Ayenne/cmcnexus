# Generated by Django 3.0.4 on 2020-04-18 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0014_auto_20200418_1404'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='language',
            field=models.CharField(choices=[('French', 'French'), ('English', 'English'), ('Spanish', 'Spanish')], default='', max_length=10),
        ),
    ]