# -*- coding: utf-8 -*-

from django import template
from django.utils.safestring import mark_safe
import json


register = template.Library()


@register.filter
def rate(value):
    if value:
        a = []
        for i in value:
            a.append(i.value.key.key)
        ret1 = list(set(a))
        if len(ret1) > 3:
            ret = ','.join(ret1[:3]) + ",..."
        else:
            ret = ','.join(ret1)
        return mark_safe(ret)
    else:
        return mark_safe('OPS')