from django.urls import path

from apps.cases.views import RetrieveUpdateDeleteCaseView, ValidateCaseView, CloseCaseView, \
    RejectCaseView, MatchOrganisation, AssignOrganisation, AcceptCaseAsOrg, RefuseCaseAsOrg, ListCaseView, CreateCaseView

urlpatterns = [
    path('', ListCaseView.as_view()),
    path('add/', CreateCaseView.as_view()),
    path('<int:id>/', RetrieveUpdateDeleteCaseView.as_view()),
    path('<int:case_id>/validate/', ValidateCaseView.as_view()),
    path('<int:case_id>/close/', CloseCaseView.as_view()),
    path('<int:case_id>/reject/', RejectCaseView.as_view()),
    path('<int:case_id>/match/', MatchOrganisation.as_view()),
    path('<int:case_id>/assign/', AssignOrganisation.as_view()),
    path('<int:case_id>/accept/', AcceptCaseAsOrg.as_view()),
    path('<int:case_id>/refuse/', RefuseCaseAsOrg.as_view()),
]
