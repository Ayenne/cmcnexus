# Generated by Django 3.0.4 on 2020-04-19 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0020_auto_20200419_1618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='nature_of_referral',
            field=models.CharField(choices=[('Urgent', 'Urgent'), ('Emergency', 'Emergency'), ('Life changing', 'Life changing')], default='', max_length=20),
        ),
    ]
