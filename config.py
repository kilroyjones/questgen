
class Config:
    pass

class DevelopmentConfig(Config):
    print("HEre")
    DEBUG=True

config = {
    'development': DevelopmentConfig
}
