from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        User.objects.all().delete()
        superuser = User()
        superuser.email = 'super@mail.com'
        superuser.username = 'super'
        superuser.set_password('qwaszx')
        superuser.is_superuser = True
        superuser.is_staff = True
        superuser.save()

        for user_number in range(1, 6):
            user = User()
            user.email = f'test{user_number}@mail.com'
            user.username = f'test{user_number}'
            user.set_password('qwaszx')
            user.save()
