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

class url_ban(mongoengine.Document):
    url = mongoengine.StringField(max_length=1024)

class setting(mongoengine.Document):
    type = mongoengine.StringField(max_length=16)
    title = mongoengine.StringField(max_length=16)
    context = mongoengine.StringField(max_length=1024)
    exp = mongoengine.StringField(max_length=16)