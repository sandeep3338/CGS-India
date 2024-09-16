    document.getElementById('ageForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const birthdate = new Date(document.getElementById('birthdate').value);
      const calcDate = new Date(document.getElementById('calcdate').value);

      if (!birthdate || !calcDate) {
        alert('Please enter valid dates');
        return;
      }

      const age = calculateAge(birthdate, calcDate);

      document.getElementById('ageResult').textContent = `Your age on ${calcDate.toDateString()} will be: ${age} years`;
    });

    function calculateAge(birthdate, calcDate) {
      let age = calcDate.getFullYear() - birthdate.getFullYear();
      const monthDifference = calcDate.getMonth() - birthdate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && calcDate.getDate() < birthdate.getDate())) {
        age--;
      }

      return age;
    }
  