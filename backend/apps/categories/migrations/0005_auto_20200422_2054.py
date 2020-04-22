# Generated by Django 3.0.4 on 2020-04-22 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0004_auto_20200410_1537'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='id',
            field=models.IntegerField(choices=[(1, 'Medical'), (2, 'Administrative'), (3, 'Logistics')], default=1, primary_key=True, serialize=False),
        ),
    ]
