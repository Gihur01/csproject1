from faker import Faker

fake = Faker()

with open("data.txt", "w") as f:

  for _ in range(10):  # Generate 10 fake names and email addresses
      name = fake.name()
      email = fake.email()
      password = fake.password()
      birth=fake.date_of_birth(minimum_age = 18, maximum_age = 75)
      f.writelines(name)
      f.writelines(email)
      f.writelines(password)
      f.writelines(str(birth))

    