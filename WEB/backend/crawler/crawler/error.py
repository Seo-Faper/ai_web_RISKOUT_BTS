class HTMLElementsNotFoundError(Exception):
    def __init__(self, location, cant_find_what):
        self.msg = "in " + location + "...HTMLElementsNotFoundError: " + "can't find " + cant_find_what

    def __str__(self):
        return self.msg

class englishContentError(Exception):
    def __init__(self):
        self.msg = "english content discovered"

    def __str__(self):
        return self.msg

class contentLengthError(Exception):
    def __init__(self):
        self.msg = "contents too short or too long"

    def __str__(self):
        return self.msg
