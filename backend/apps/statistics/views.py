from django.db.models import Count
from django.db.models.functions import TruncYear
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.cases.models import Case, CaseWorkflow
from apps.statistics.permissions import DashboardPermission
from apps.statistics.serializers import YearlyCasesSerializer


class StatisticsBundleView(APIView):
    permission_classes = [IsAuthenticated, DashboardPermission]

    def get(self, request):
        cases = Case.objects.all()\
            .annotate(year=TruncYear('created'))\
            .values("year")\
            .annotate(cases_created=Count('id'))\
            .order_by("year")

        cases_status = []
        for state in CaseWorkflow.states:
            count = Case.objects.filter(status=state).count()
            cases_status.append({
                "status": state.name,
                "count": count
            })

        cases_category = Case.objects.all()\
            .values("categories")\
            .annotate(count=Count('id'))

        statistics = {
            "cases": {
                "total": Case.objects.count(),
                "yearly": YearlyCasesSerializer(cases, many=True).data,
                "by_status": cases_status,
                "by_category": cases_category,
            },
            "organisations": "to be implemented",
        }

        return Response(statistics)
