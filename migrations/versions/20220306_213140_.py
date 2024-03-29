"""empty message

Revision ID: c30b2c15d5c0
Revises: be2d24acc88d
Create Date: 2022-03-06 21:31:40.041944

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c30b2c15d5c0'
down_revision = 'be2d24acc88d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('profile_picture', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'profile_picture')
    # ### end Alembic commands ###
