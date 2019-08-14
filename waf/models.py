# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

import mongoengine
# Create your models here.


class cc_ban(mongoengine.Document):
    ip = mongoengine.StringField(max_length=16)
    count = mongoengine.IntField(default=0)

class ip_ban(mongoengine.Document):
    ip = mongoengine.StringField(max_length=16)