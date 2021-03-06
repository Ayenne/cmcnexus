# Generated by Django 3.0.4 on 2020-04-10 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='name',
            field=models.CharField(choices=[('Undefined', 'Undefined'), ('Medical', 'Medical'), ('Administrative', 'Administrative'), ('Logistics', 'Logistics')], default='Undefined', max_length=14),
        ),
        migrations.AlterField(
            model_name='category',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
