import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', unique: true })
	username: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'varchar' })
	nickname: string;

	@Column({ type: 'varchar' })
	email: string;

	@Column({ type: 'varchar', nullable: true })
	profilePicture?: string;
}
