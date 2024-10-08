"""update tables to fit challenge

Revision ID: 631308d0cce6
Revises: 7ab8b9984561
Create Date: 2024-09-06 17:09:53.905075

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '631308d0cce6'
down_revision = '7ab8b9984561'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('food_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('foodCategory', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('foodCategory')
    )
    op.create_table('foods',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('categoryId', sa.Integer(), nullable=False),
    sa.Column('food', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['categoryId'], ['food_types.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('selected_foods',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('formId', sa.Integer(), nullable=False),
    sa.Column('foodId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['foodId'], ['foods.id'], ),
    sa.ForeignKeyConstraint(['formId'], ['form_record.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('form_record', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fullName', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('position', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('city', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('state', sa.String(length=2), nullable=False))
        batch_op.add_column(sa.Column('ownership', sa.String(length=2), nullable=False))
        batch_op.add_column(sa.Column('phone', sa.String(length=14), nullable=False))
        batch_op.add_column(sa.Column('email', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('birthday', sa.Date(), nullable=False))
        batch_op.add_column(sa.Column('biologicalGender', sa.String(length=9), nullable=False))
        batch_op.add_column(sa.Column('weight', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('height', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('systolicBloodPressure', sa.String(length=20), nullable=True))
        batch_op.add_column(sa.Column('diastolicBloodPressure', sa.String(length=20), nullable=True))
        batch_op.add_column(sa.Column('diabetes', sa.String(length=10), nullable=False))
        batch_op.add_column(sa.Column('hearthProblems', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('highPressure', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('asthma', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('depression', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('anxiety', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('highCholesterol', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('backPain', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('jointPain', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('headPain', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('cancer', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('std', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('others', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('typeOfFood', sa.Integer(), nullable=False))
        batch_op.create_unique_constraint(None, ['email'])
        batch_op.create_foreign_key(None, 'food_types', ['typeOfFood'], ['id'])
        batch_op.drop_column('cidade')
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('form_record', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('cidade', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('typeOfFood')
        batch_op.drop_column('others')
        batch_op.drop_column('std')
        batch_op.drop_column('cancer')
        batch_op.drop_column('headPain')
        batch_op.drop_column('jointPain')
        batch_op.drop_column('backPain')
        batch_op.drop_column('highCholesterol')
        batch_op.drop_column('anxiety')
        batch_op.drop_column('depression')
        batch_op.drop_column('asthma')
        batch_op.drop_column('highPressure')
        batch_op.drop_column('hearthProblems')
        batch_op.drop_column('diabetes')
        batch_op.drop_column('diastolicBloodPressure')
        batch_op.drop_column('systolicBloodPressure')
        batch_op.drop_column('height')
        batch_op.drop_column('weight')
        batch_op.drop_column('biologicalGender')
        batch_op.drop_column('birthday')
        batch_op.drop_column('email')
        batch_op.drop_column('phone')
        batch_op.drop_column('ownership')
        batch_op.drop_column('state')
        batch_op.drop_column('city')
        batch_op.drop_column('position')
        batch_op.drop_column('fullName')

    op.drop_table('selected_foods')
    op.drop_table('foods')
    op.drop_table('food_types')
    # ### end Alembic commands ###
