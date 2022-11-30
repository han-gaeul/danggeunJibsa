from django import forms
from .models import Community, Comment

class CommunityForm(forms.ModelForm):
    class Meta:
        model = Community
        fields = [
            "community",
            "title",
            "content",
            "image",
        ]

        labels = {
            "community": "게시판 선택",
            "title": "제목",
            "content": "내용",
            "image": "이미지",
        }

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        exclude = ('community', 'user')

        labels = {
            "content": "댓글",
        }